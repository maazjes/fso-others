import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import ListItem from './ListItem'

describe('Todo with done=false', () => {
  const todo = {
    text: "asd",
    done: false
  }
  test('renders with working buttons', async () => {
    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();
    const { getByText } =render(<ListItem todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete}/>);
    const user = userEvent.setup()
    const deleteButton = screen.getByText('Delete')
    const doneButton = screen.getByText('Set as done')
    await user.click(deleteButton)
    await user.click(doneButton)
    expect(getByText('asd')).toBeDefined();
    expect(getByText('This todo is not done')).toBeDefined();
    expect(onClickDelete.mock.calls[0][0]).toEqual({
      text: "asd",
      done: false
    })
    expect(onClickComplete.mock.calls[0][0]).toEqual({
      text: "asd",
      done: false
    })
  })
})