// MyPage.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import MyPage from '../components/MyPage';

// Mock the useGetDaysInMonthArray hook
jest.mock('../hooks/useGetDaysInMonthArray', () => ({
  useGetDaysInMonthArray: jest.fn(() => ({
    daysInMonthArray: [{ day: 1 }, { day: 2 }, { day: 3 }], // Mock data for testing
  })),
}));

describe('MyPage', () => {
  it('renders correctly with mocked data', () => {
    render(<MyPage />);

    // Your test assertions here based on the rendered content

    const dayListItems = screen.getAllByRole('listitem');

    expect(dayListItems).toHaveLength(3); // Assuming three items in the mocked data
  });
});
