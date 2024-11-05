
export class ApiRateLimitDelayService {
    readonly requestDelayTime = 500;
    
    async delayRequest(): Promise<void> {
        console.log(`Delaying the next request by ${this.requestDelayTime} milliseconds to avoid rate limiting.`);
        let result = await new Promise(resolve => setTimeout(resolve, this.requestDelayTime));     
        let meh = "meh";
    }
}