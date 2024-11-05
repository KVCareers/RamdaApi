
import fs from 'fs';
import path from 'path';

export class ConfigService {
    
    readonly configFileName = 'config.private.json';

    private getConfigFileJson() {
        // Access config file at the root of the project
        let privateConfigPath = path.join(process.cwd(), this.configFileName);

        if (!fs.existsSync(privateConfigPath)) {
            throw new Error(`Config file not found at path: ${privateConfigPath}`);
        } 
        const result = JSON.parse(fs.readFileSync(privateConfigPath, 'utf8'));

        return result;
    }

    getConfigValue(key: string): string {
        const configJson = this.getConfigFileJson();
        const result = configJson[key];
        return result;
    }
}