
export class ApiRateLimitDelayService {
    readonly requestDelayTime = 200;
    
    async delayRequest(): Promise<void> {
        console.log(`Delaying the next request by ${this.requestDelayTime} milliseconds to avoid rate limiting.`);
        await new Promise(resolve => setTimeout(resolve, this.requestDelayTime));     
    }
}

const apiRateLimitDelayService = new ApiRateLimitDelayService();
export default apiRateLimitDelayService;