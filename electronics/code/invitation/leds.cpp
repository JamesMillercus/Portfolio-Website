#include <Arduino.h>

class LedClass {
  private: 
    // led settings
    int brightness = 0;    // how bright the LED is
    int fadeAmount = 5;    // how many points to fade the LED by
    int maxBrightness = 20;
    // led pins
    int instructionOne = 11;
    int instructionTwo = 9;
    int instructionThree = 10;
    int emailAddress = 13;
    int phoneNumber = 5;
    // led pins array
    int leds[5] = {
      instructionOne, instructionTwo, instructionThree, emailAddress, phoneNumber
    };
    // led patterns
    int ledPattern = 1;
    // animation variables
    unsigned long previousMillis = 0;        // will store last time LED was updated
    const long interval = 150;           // interval at which to blink (milliseconds)
    
    // function to check what led pattern needs to display based on sensor interaction
    void checkSensors(String sensorPressed) {
      // card sensors have not been touched and any button is pressed, trigger second pattern 
      if (ledPattern <= 1 && sensorPressed.length() > 0) ledPattern++;
      // card sensors have been touched
      else if (ledPattern <= 2 && sensorPressed.length() == 9) ledPattern++;
    }

    // function for updating the led pattern
    void updateLedPattern(String sensorPressed) {
      // check sensors once a button has been pressed
      checkSensors(sensorPressed);
    }
    
    // function for triggering Leds
    void lightUp() {
      // always keep instruction one on
      analogWrite(instructionOne, maxBrightness);
      // if a sensor is touched, keep instructions two on
      if( ledPattern >= 2) analogWrite(instructionTwo, maxBrightness);
      // if select sensor is pressed
      if(ledPattern == 3) {
        // keep instruction three on
        analogWrite(instructionThree, maxBrightness);
        // animate email address and phone number leds
        analogWrite(emailAddress, brightness);
        analogWrite(phoneNumber, brightness);
      }
      // animate leds
      analogWrite(leds[ledPattern], brightness);
      // change the brightness for next time through the loop:
      brightness = brightness + fadeAmount;
      // reverse the direction of the fading at the ends of the fade:
      if (brightness <= 0 || brightness >= maxBrightness) fadeAmount = -fadeAmount;
    }
    
  public:
    void setup() {
      for(int x = 0; x < 5; x++) pinMode(leds[x], OUTPUT);
    }
    
    String activate(String sensorPressed) {
      // update led patterns
      updateLedPattern(sensorPressed);

      // track time
      unsigned long currentMillis = millis();
      // on interval
      if (currentMillis - previousMillis >= interval) {
       // save the last time you blinked the LED
       previousMillis = currentMillis;
       // light up the leds as per led patterns
       lightUp();
      }
      return sensorPressed;
    }
};
