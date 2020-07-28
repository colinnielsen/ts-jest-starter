import * as _ from "lodash";

export default class jobRunnerInterface {
    public jobIds: Array<String> = [];
    private pollId: number | undefined;
    private jobStatus: Array<Object> = [];
    private static parameterString: String = "";
    constructor(jobIds?: any) {
        if (_.isString(jobIds)) {
            this.jobIds = [jobIds];
        } else if (_.isArray(jobIds)) {
            this.jobIds = jobIds;
        }
    }

    public static async createJob({ params, targetURL, body, method, key, onsuccess, onfailure }: JobParameters) {
        // params are the parameters sent to the targetURL when the job runs
        // targetURL is the url the job runner will hit
        // body will be the body of the request made by the job runnner
        // method will be the type of method the job runner will use against the targetURL
        // key is the api key to make the request
        if (targetURL) {
            if (params && !_.isEmpty(params)) {
                _.forOwn(params, (value: any, prop: any) => {
                    if (value !== undefined) {
                        this.parameterString += `${prop}=${value}&`;
                    }
                });
                this.parameterString = this.parameterString.slice(0, -1); // this has been changed to remove slice. It is to remove the last ampersand from the string
            }
            this.parameterString += "&api_key={{apikey}}";
            const url = AjaxUtils.apiBaseUrl + targetURL + `?${this.parameterString}`;
            const requestBody = {
                url,
                method,
                body,
                key,
                onsuccess: onsuccess || [],
                onfailure: onfailure || [],
            };
            let data = await fetch("job", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })
            let response = await data.json();            
            const responseData = response.data as string[];
            if (!_.isEmpty(responseData)) {
                return responseData[0];
            }
            throw Error("Erroneous response received by JobRunnerInterface's createJob method.");
        } else {
            return Promise.reject("Target URL parameter is empty");
        }
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
            let res = await fetch("./testRes.json");
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

class AjaxUtils {
    public static apiBaseUrl = "https://example.com/api/";
}