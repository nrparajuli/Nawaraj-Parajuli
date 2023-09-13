
export enum LmsType {
    Canvas = 'Canvas',
    D2l = 'D2l',
    Learn = 'Learn',
    Moodle = 'Moodle',
    Wcm = 'Wcm',
    Web = 'Web',
    Schoology = 'Schoology'
}

/**
 * The lms type is used in lots of locations and is often used to breakdown usage of a feature in analytics platforms
 * (i.e. mixpanel). Unfortunately, historically, we've not always used the LmsType enum values directly but rather
 * used similar ill-defined strings. These strings are still in use in various integrations and are now out of the
 * control from the Ally team (e.g. Learn or Wcm).
 *
 * This function can be used to get a backwards compatible string for a given lms type
 *
 * @param lmsType The lms type to get the old ill-defined string for
 */
export function getPlatformName(lmsType: LmsType): string {
    switch (lmsType) {
        case LmsType.Canvas:
            // Defined by the custom Canvas integration logic
            return 'canvas';
        case LmsType.D2l:
            // Defined by the D2lAnnotator
            return 'd2l';
        case LmsType.Learn:
            // Defined by the custom Learn integration logic
            // Defined by the Learn Ultra team
            return 'learn';
        case LmsType.Moodle:
            // Defined by the custom Moodle integration logic (note that this previously used to be moodlerooms)
            return 'moodle';
        case LmsType.Wcm:
            // Defined by the Wcm team
            return 'Wcm';
        case LmsType.Web:
            // Defined by the WebAnnotator
            return 'web';
        case LmsType.Schoology:
            return 'schoology';
    }
}
