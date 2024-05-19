import { render, screen } from '@testing-library/react';
import TestSection from '@/app/[locale]/(routes)/stories/_components/TestSection';

jest.mock('@/app/[locale]/(routes)/stories/_components/TestDescription', () => {
  const TestDescriptionMock = () => <div data-testid="test-description">TestDescription Mock</div>;
  TestDescriptionMock.displayName = 'TestDescription';
  return TestDescriptionMock;
});

jest.mock('@/app/[locale]/(routes)/stories/_components/TestInstruction', () => {
  const TestInstructionMock = () => <div data-testid="test-instruction">TestInstruction Mock</div>;
  TestInstructionMock.displayName = 'TestInstruction';
  return TestInstructionMock;
});

jest.mock('@/app/[locale]/(routes)/stories/_components/TestChoice', () => {
  const TestChoiceMock = () => <div data-testid="test-choice">TestChoice Mock</div>;
  TestChoiceMock.displayName = 'TestChoice';
  return TestChoiceMock;
});

describe('TestSection', () => {
  it('renders TestDescription component', () => {
    render(<TestSection />);
    const testDescription = screen.getByTestId('test-description');
    expect(testDescription).toBeInTheDocument();
  });

  it('renders TestInstruction component', () => {
    render(<TestSection />);
    const testInstruction = screen.getByTestId('test-instruction');
    expect(testInstruction).toBeInTheDocument();
  });

  it('renders TestChoice component', () => {
    render(<TestSection />);
    const testChoice = screen.getByTestId('test-choice');
    expect(testChoice).toBeInTheDocument();
  });
});
