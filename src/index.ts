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

    public getStatus(): Array<Object> {
        return this.jobStatus;
    }

    public stopPolling(): String {
        clearInterval(this.pollId);
        return 'Polling has stopped';
    }
}

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
