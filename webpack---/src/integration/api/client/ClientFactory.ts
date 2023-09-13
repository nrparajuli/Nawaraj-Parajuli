
import {AnonymousClient} from 'src/integration/api/client/AnonymousClient';
import {Client} from 'src/integration/api/client/Client';
import {IClient} from 'src/integration/api/client/client.model';
import {ClientConfig, IClientConfigObj} from 'src/integration/api/client/ClientConfig';

/** Type alias for any type from which we know how to create a client instance */
export type Clientable = IClient | ClientConfig | IClientConfigObj;

/**
 * Create a client from the specified [[Clientable]].
 *
 * @param obj           The client source object
 * @param platformName  Platform name
 * @return              The client that can be used to talk to the API
 */
export function from(obj: Clientable, platformName: string | null = null): IClient {
    if (obj instanceof Client || obj instanceof AnonymousClient) {
        return obj as IClient;
    } else if (obj instanceof ClientConfig) {
        return new Client(obj as ClientConfig, platformName);
    } else {
        return new Client(ClientConfig.fromConfigObject(obj as IClientConfigObj), platformName);
    }
}
