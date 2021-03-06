import stringJSON from '../../languages/languages.json';


const addNewHostLocalize = stringJSON.sr.page.addNewHost;
const addNewServiceLocalize = stringJSON.sr.page.addNewService;

export const check = [{ value: "On", key: 1 }, { value: "Off", key: 0 }, { value: "Skip", key: 2 }, { value: "Null", key: 3 }];
export const check1 = [{ value: "Down", key: 1 }, { value: "Up", key: 2 }, { value: "Unreachable", key: 3 }];
export const check2 = [{ value: "Down", key: 1 }, { value: "Unreachable", key: 2 }, { value: "Recovery", key: 3 }, { value: "Flapping", key: 4 }, { value: "Scheduled Downtime", key: 5 }];
export const check3 = [{ value: "Down", key: 1 }, { value: "Up", key: 2 }, { value: "Unreachable", key: 3 }, { value: "Notification", key: 4 }, { value: "None", key: 4 }];

export const checkPeriodOptions = [{ value: "24x7", key: 1 }, { value: "24x7_sans_holidays", key: 2 }, { value: "none", key: 3 }, { value: "us-holidays", key: 4 }, { value: "workhours", key: 5 }, { value: "xi_timeperiod_24x7", key: 6 }]
export const eventHandlerOptions = [
    { value: "check_none", key: 1 }, { value: "check-host-alive-tftp", key: 2 },
    { value: "notify-host-by-email", key: 3 }, { value: "notify-email-by-email", key: 4 },
    { value: "xi_host_event_handler", key: 5 }, { value: "xi_host_notification_handler", key: 6 },
    { value: "xi_service_event_handler", key: 7 }, { value: "xi_service_notification_handler", key: 8 },
    { value: "process-host-perfdata-file-bulk", key: 9 }, { value: "process-host-perfdata-file-pnp-bulk", key: 10 },
    { value: "process-service-perfdata-file-bulk", key: 11 }, { value: "process-service-perfdata-file-pnp-bulk", key: 12 },
    { value: "process-service-perfdata-file-pnp-normal", key: 13 }
]

export const commonFields = [
    { type: "text", name: "host_name", text: addNewHostLocalize.hostname },
    { type: "text", name: "host_alias", text: addNewHostLocalize.alias },
    { type: "text", name: "address", text: addNewHostLocalize.address },
    { type: "text", name: "display_name", text: addNewHostLocalize.displayName },
    { type: "text", name: "check_command", text: addNewHostLocalize.checkCommand }
];

export const commonServiceFields = [
    { type: "text", name: "host_name", text: addNewServiceLocalize.hostname },
    { type: "text", name: "config_name", text: addNewServiceLocalize.configName },
    { type: "text", name: "service_description", text: addNewServiceLocalize.serviceDescription },
    { type: "text", name: "display_name", text: addNewServiceLocalize.displayName },
    { type: "text", name: "check_command", text: addNewServiceLocalize.checkCommand }
];

export const checkSettings1 = [
    { type: "text", name: "normal_check_interval", text: addNewHostLocalize.checkInterval, unit: "min" },
    { type: "text", name: "retry_check_interval", text: addNewHostLocalize.retryInterval, unit: "min" },
    { type: "text", name: "max_check_attempts", text: addNewHostLocalize.maxCheckAttempts, unit: "br. poku??aja" },
    { type: "check", name: "active_checks_enabled", checks: check, text: addNewHostLocalize.activeChecksEnabled },
    { type: "check", name: "passive_checks_enabled", checks: check, text: addNewHostLocalize.passiveChecksEnabled },
    { type: "select", name: "check_period", text: addNewHostLocalize.checkPeriod, options: checkPeriodOptions },
    { type: "text", name: "freshness_threshold", text: addNewHostLocalize.freshnessThreshold, unit: "s" },
    { type: "check", name: "check_freshness", checks: check, text: addNewHostLocalize.checkFreshness },
];

export const checkSettings2 = [
    { type: "select", name: "event_handler", text: addNewHostLocalize.eventHandler, options: eventHandlerOptions },
    { type: "check", name: "event_handler_enabled", checks: check, text: addNewHostLocalize.eventHandlerEnabled },
    { type: "text", name: "low_flap_threshold", text: addNewHostLocalize.lowFlapThreshold, unit: "%" },
    { type: "text", name: "high_flap_threshold", checks: check, text: addNewHostLocalize.highFlapThreshold, unit: "%" },
    { type: "check", name: "flap_detection_enabled", checks: check, text: addNewHostLocalize.flapDetectionEnabled },
    { type: "check", name: "flap_detection_options", checks: check1, text: addNewHostLocalize.flapDetectionOptions },
    { type: "check", name: "retain_status_information", checks: check, text: addNewHostLocalize.retainStatusInformation },
    { type: "check", name: "retain_non_status_information", checks: check, text: addNewHostLocalize.retainNoStatusInformation },
    { type: "check", name: "process_performance_data", checks: check, text: addNewHostLocalize.processPerfData },
];

export const alertFields = [
    { type: "select", name: "notification_period", text: addNewHostLocalize.notificationPeriod, options: checkPeriodOptions },
    { type: "check", name: "notification_options", checks: check2, text: addNewHostLocalize.notificationOptions },
    { type: "text", name: "notification_interval", text: addNewHostLocalize.notificationInterval, unit: "min" },
    { type: "text", name: "first_notification_delay", text: addNewHostLocalize.firstNotificationDelay, unit: "min" },
    { type: "check", name: "notifications_enabled", checks: check, text: addNewHostLocalize.notificationEnabled },
    { type: "check", name: "stalking_options", checks: check1, text: addNewHostLocalize.stalkingOptions }
];

export const miscSettings1 = [
    { type: "text", name: "notes", text: addNewHostLocalize.notes },
    { type: "text", name: "VRMLimage", text: addNewHostLocalize.VRMLimage },
    { type: "text", name: "notes_url", text: addNewHostLocalize.notesURL },
    { type: "text", name: "status_image", text: addNewHostLocalize.statusImage },
    { type: "text", name: "action_url", text: addNewHostLocalize.actionURL },
    { type: "text", name: "icon_image", text: addNewHostLocalize.iconImage },
    { type: "text", name: "icon_image_alt_text", text: addNewHostLocalize.iconImageAltText }
];

export const miscSettings2 = [
    { type: "text", name: "2Dcoords", text: addNewHostLocalize._2Dcoords },
    { type: "text", name: "3Dcoords", text: addNewHostLocalize._3Dcoords },
    { type: "text", name: "generic_name", text: addNewHostLocalize.genericName }
];