import React, { FC, useEffect, useState } from 'react';

import { Card, Tree } from 'antd';
const { TreeNode } = Tree;

interface Chief {
  id: number;
  age: number;
  name: string;
  surname: string;
  recipes: {
    id: number;
    title: string;
    description: string;
    calTotal?: number;
    ingredients: {
      title: string;
      cal: number;
      count: 2;
    }[];
  }[];
}

const Task6: FC = () => {
  const [chiefs, setChiefs] = useState<Chief[] | null>(null);
  useEffect(() => {
    fetch('https://api.myjson.com/bins/crhlb')
      .then(response => response.json())
      .then(response => {
        setChiefs(
          response.chiefs
            .map((chief: Chief) => {
              if (chief.id === 1) {
                chief.recipes = [
                  ...chief.recipes,
                  {
                    ...chief.recipes[0],
                    id: 2,
                    title: 'Б Салат весенний'
                  },
                  {
                    ...chief.recipes[0],
                    id: 3,
                    title: 'А Салат весенний'
                  }
                ];
              }
              return chief;
            })
            .filter((chief: Chief) => chief.id !== 2)
            .map((chief: Chief) => {
              chief.recipes
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(recipe => {
                  recipe['calTotal'] = recipe.ingredients.reduce(
                    (prev, cur) => ({
                      cal: prev.cal + cur.cal,
                      title: cur.title,
                      count: cur.count
                    })
                  ).cal;
                  return recipe;
                });

              return chief;
            })
        );
      });
  }, []);

  return (
    <section style={{ width: '100%', maxWidth: 1200, margin: '30px auto' }}>
      {chiefs ? (
        chiefs.map(({ id, name, surname, age, recipes }) => (
          <Card key={id}>
            <Tree>
              <TreeNode title={`Имя: ${name}`} key='name' />
              <TreeNode title={`Фамилия: ${surname}`} key='surname' />
              <TreeNode title={`Возраст: ${age}`} key='age' />
              <TreeNode title='Рецепты: ' key='recipes'>
                {recipes &&
                  recipes.map(
                    ({ id, title, description, ingredients, calTotal }) => (
                      <TreeNode title={title} key={title + id}>
                        <TreeNode
                          title={`Описание: ${description}`}
                          key={description + id}
                        />
                        <TreeNode
                          title={`Всего каллорий: ${calTotal}`}
                          key={'calTotal' + id}
                        />
                        <TreeNode
                          title='Ингридиенты: '
                          key={'ingredients' + id}
                        >
                          {ingredients &&
                            ingredients.map(({ title, cal, count }, i) => (
                              <TreeNode title={title} key={title + i}>
                                <TreeNode
                                  title={`Калории: ${cal}`}
                                  key={'' + cal + i}
                                />
                                <TreeNode
                                  title={`Количество: ${count}`}
                                  key={'' + count + i}
                                />
                              </TreeNode>
                            ))}
                        </TreeNode>
                      </TreeNode>
                    )
                  )}
              </TreeNode>
            </Tree>
          </Card>
        ))
      ) : (
        <Card loading={!chiefs} />
      )}
    </section>
  );
};

export default Task6;
