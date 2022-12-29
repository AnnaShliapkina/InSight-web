import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Section, Container, List, Title, Item, Text } from './SideBar.styled';
import { NotRecomendedFoodList } from './NotRecomendedFoodList/NotRecomendedFoodList';
import { selectDiary, selectDiet } from 'redux/selectors';

export const SideBar = () => {
  const [show, setShow] = useState(false);
  const params = useParams();

  const { inputDiary } = useSelector(selectDiary);
  const diet = useSelector(selectDiet);

  const onShowClick = () => {
    setShow(!show);
  };

  const consumed = inputDiary.reduce((prev, item) => {
    if (!isNaN(item.calories)) {
      return prev + parseInt(item.calories);
    }
    return prev + item.calories;
  }, 0);

  const left = diet.dailyCalories - consumed;
  const percent = Math.ceil((consumed / diet.dailyCalories) * 100);

  return (
    <Section>
      <Container>
        <List>
          <Title>Summary for {params.day}</Title>
          <Item>
            <Text>Left</Text>
            <Text>{left <= 0 ? '- Done for today -' : `${String(left).padStart(3, '0')} kcal`}</Text>
          </Item>
          <Item>
            <Text>Consumed</Text>
            <Text>{String(consumed).padStart(3, '0')} kcal</Text>
          </Item>
          <Item>
            <Text>Daily rate</Text>
            <Text>{String(diet.dailyCalories).padStart(3, '0')} kcal</Text>
          </Item>
          <Item>
            <Text>n&#37; of normal</Text>
            {diet.dailyCalories ? (
              <>
                {percent > 100 ? (
                  <Text style={{ borderBottom: '2px solid tomato' }}>{percent} &#37;</Text>
                ) : (
                  <Text>{percent} &#37;</Text>
                )}
              </>
            ) : (
              <Text>0 &#37;</Text>
            )}
          </Item>
        </List>
        <List>
          <Title>Food not recommended</Title>
          {diet.stopProducts.length !== 0 ? (
            <NotRecomendedFoodList show={show} products={diet.stopProducts} onClick={onShowClick} />
          ) : (
            <Item style={{ display: 'block' }}>
              <Text>Your diet will be displayed here</Text>
            </Item>
          )}
        </List>
      </Container>
    </Section>
  );
};
