import TestChoice from './testChoice';
import TestDescription from './testDescription';
import TestInstruction from './testInstruction';

const TestSection = () => {
  return (
    <div>
      <TestDescription />
      <TestInstruction />
      <TestChoice />
    </div>
  );
};

export default TestSection;
