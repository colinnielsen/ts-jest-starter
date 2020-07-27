import jobRunnerInterface from '../src/index';

test("stores jobIds as an array", () => {
    const testString = 'testId123';
    const testArray = ['test', 'test2'];
    const JobRunnerString = new jobRunnerInterface(testString);
    expect(JobRunnerString.jobIds).toEqual([testString]);
    const JobRunnerArray = new jobRunnerInterface(testArray);
    expect(JobRunnerArray.jobIds).toBe(testArray);
});

