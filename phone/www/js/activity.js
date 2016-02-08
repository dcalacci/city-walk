function start_pedometer_updates() {
    
}

function gotSteps(app, pedometerData) {
    
    
    // pedometerData.startDate; -> ms since 1970
    // pedometerData.endDate; -> ms since 1970
    // pedometerData.numberOfSteps;
    // pedometerData.distance;
    // pedometerData.floorsAscended;
    // pedometerData.floorsDescended;
}

function start_measuring_steps(app) {
    cordova.plugins.pedometer.startPedometerUpdates(gotSteps, gotError);
}
