#include <CapacitiveSensor.h>
#include "sensors.cpp"
#include "leds.cpp"
#include "keyboard.cpp"

SensorClass sensors;
LedClass leds;
KeyboardClass key;

void setup() {
   leds.setup();
}

void loop() {
    // loop through readings of all sensor pads
    sensors.detectActivity();
    // press keyboard button
    key.press(
      // based on returned value from leds.activate
      leds.activate(
        // which is triggered from a touched sensor
        sensors.checkActive()
      )
    );
}
