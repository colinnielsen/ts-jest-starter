import * as _ from 'lodash';

export default class jobRunnerInterface {
    public jobIds: Array<String> = [];
    private pollId: number | undefined;
    private jobStatus: Array<Object> = [];

    constructor(jobIds?: any) {
        if (_.isString(jobIds)) {
            this.jobIds = [jobIds];
        } else if (_.isArray(jobIds)) {
            this.jobIds = jobIds;
        }
    }
    
    public static async createJob(jobParameters: JobParameters) {
        let response = await fetch('./ssssss');
        let data = await response.json();
        return data;
    }
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
/*
return enqueueJob(
    getState,
    {
        targetURL: "trading/rebalance",
        method: "POST",
        params: requestParams,
        key: folioId,
        body: priceOverride,
    })
    private async poll() {
        try {
            let res = await fetch('./testRes.json');
            let { response } = await res.json();
            this.jobStatus.push({ message: `${response.statusMessage} ${Date.now()}` });
        } catch (e) {
            console.log(`error: ${e} has broken polling init`);
        }
    }

    public pollJobStatus(interval: number) {
        this.pollId = <any>setInterval(
            () => this.poll(),
            (interval * 1000)
        );
    }
*/

// export class jobRunnerInterface {
//     constructor(Array: jobIds, String: jobId, null){}
//     pollJobStatus(number: interval) {}
//     stopPolling(){}
//     createJob(Array<Id>: jobs / or / String: jobId) {}
//     triggerJob(Array<Id>: jobs / or / String: jobId) {}
//     deleteJob(Array<Id>: jobs / or / String: jobId) {}
//     updateJob(Array<Id>: jobs / or / String: jobId) {}
//     getJobStatus(Array<Id>: jobs / or / String: jobId) {}
//     rerunJob(Array<Id>: jobs / or / String: jobId) {}
// }
