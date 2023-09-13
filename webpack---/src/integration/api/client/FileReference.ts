
import { IUploadReference } from './UploadReference';
import { UploadType } from './UploadType';

/** Simple JavaScript type for a file reference */
export interface IJsFileReference extends IUploadReference {
    id: string;
    embed?: {altText?: string};
    uploadType: UploadType;
}

/** Type alias for a map of [[IJsFileReference]] */
export interface IJsFileReferences {
    [key: string]: IJsFileReference;
}

/** Type that represents an instance of a file reference from our JS model */
export interface IFileReference {
    /**
     * Create a string identity for the contents of this file reference. Useful to be able to "cache" file score
     * information by discriminating a file reference based on the attributes of the reference that contribute to its
     * score.
     *
     * Some sample id representations are:
     *
     *  * `123456`                                  - Represents a non-embedded file link
     *  * `123456:null`                             - Represents an embedded file that has no alt text
     *  * `123456:embed:"This is some alt text"`    - Represents an embedded file that has alt text
     */
    id(): string;

    /**
     * Extract just the raw data from the file reference. This data is representative of how the server wants data
     * POSTed when requesting file accessibility information.
     */
    data(): IJsFileReference;

    /** Determine if the file reference represents embedded media */
    isEmbedded(): boolean;
}

/** Type that represents the constructor (i.e., "companion object") of the file reference type from our JS model */
export interface IStaticFileReference {
    new(fileId: string, embed: {altText?: string}, uploadType?: string): IFileReference;
    fromAltText(fileId: string, altText: string): IFileReference;
    fromElement($el: JQuery<HTMLElement>, fileId: string, attributeOverrides?: any): IFileReference;
    fromData(data: IJsFileReference): IFileReference;
    fromRichContent(richContentId: string): IFileReference;
}

export const FileReference = require('src/shared/rest/domain/FileReference').FileReference as IStaticFileReference;
