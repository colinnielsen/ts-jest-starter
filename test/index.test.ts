import jobRunnerInterface from "../src/index";
const testString = "testId123";
const testArray = ["testId123", "testId1234"];

test("stores jobIds as an array", () => {
    const JobRunnerString = new jobRunnerInterface(testString);
    expect(JobRunnerString.jobIds).toEqual([testString]);
    const JobRunnerArray = new jobRunnerInterface(testArray);
    expect(JobRunnerArray.jobIds).toBe(testArray);
});

test("creates a job using createJob", async () => {
    // implement without instantiation
    mockSuccesfulResponse(200, ['test1234 completed'])
    const response = await jobRunnerInterface.createJob(mockRequest("POST"));
    expect(response).toEqual('test1234 completed');
    expect(globalThis.fetch)
})

test("creates a masterJob using createJob", () => {

})

const fetchMock = async (url: string, options: HTTPParams) => {
    switch (url) {
        case "/job":
            return {
                ok: true,
                status: 200,
                json: async () => [{ jobId: "test1234" }],
            }
        default:
            return {
                ok: false,
                status: 404,
                json: async () => { message: "error: no url supplied" }
            }
    }
}

const mockSuccesfulResponse = (status: Number, response: any): void => {
    globalThis.fetch = jest.fn().mockImplementation(() => {
        return new Promise((resolve) => {
            resolve({
                ok: true,
                status,
                json: () => (
                    { data: response }
                ),
            });
        });
    });
};

const mockRequest = (method: string): JobParameters => ({
    targetURL: "/testing",
    method: method,
    params: {},
    body: "FakeBody",
    key: "FakeId",
    foreach: {
        url: 'test',
        method: 'test',
        body: 'test',
        ids: 'test',
    },
    onsuccess: [],
    onfailure: [],
    queue: '50_user_med',
    continueon: 0,
});

interface HTTPParams {
    targetUrl: string;
    method: string;
    key: string;
    onSuccess?: Function;
    onFailure?: Function;
}

interface Res {
    ok: Boolean;
    status: Number;
    json: Function;
}

interface JobParameters { //import this from job-runner.d.ts
    targetURL?: string;
    method?: string;
    params?: any;
    body?: any;
    key?: string;
    foreach?: {
        url?: string;
        method?: string;
        body?: string;
        ids?: string;
    };
    onsuccess?: ChildJob[];
    onfailure?: ChildJob[];
    queue?: string;
    continueon?: number; // 0 - AnyResult(All finished), 1 - Success (default)
}

interface ChildJob {
    foreach?: {
        url?: string;
        method?: string;
    };
    url?: string;
    method?: string;
    key?: string;
    order?: number;
    body?: any;
    onsuccess?: ChildJob[];
    onfailure?: ChildJob[];
    continueon?: number;
}