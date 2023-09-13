
import {FileReport} from '../client/FileReport';

export class AlternativeTextUtil {

    /**
     * Determine if the alt text for a file that has the specified name can be considered meaningful.
     *
     * @param alt       The alt text associated to the image, if any
     * @param fileName  The name of the file the alt text is associated to
     */
    public static isMeaningful(alt?: string | null, fileName?: string | null): boolean {
        return (alt === '') || AlternativeTextUtil.restUtil.isAltTextMeaningful(alt, fileName);
    }

    /**
     * Resolve the alternative text specified by this file report.
     *
     * @param fileReport    The [[FileReport]] from which to extract the alternative text
     * @return              The alternative text (empty string is decorative, non-empty string is a specified alt text,
     *                      and `null` implies neither are specified)
     */
    public static getFromFileReport(fileReport: FileReport): string | null {
        if (fileReport.decorative === true) {
            return '';
        } else if (fileReport.description !== null && fileReport.description !== undefined) {
            return fileReport.description;
        } else {
            return null;
        }
    }

    private static restUtil = require('src/shared/rest/util');
}
