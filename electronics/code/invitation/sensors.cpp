#include <Arduino.h>
#include <CapacitiveSensor.h>

class SensorClass {
  private: 
    CapacitiveSensor   selectSensor = CapacitiveSensor(8,A5);        // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired
    CapacitiveSensor   leftSensor = CapacitiveSensor(8,A4);        // 10M resistor between pins 4 & 6, pin 6 is sensor pin, add a wire and or foil
    CapacitiveSensor   rightSensor = CapacitiveSensor(7,A3);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil
    CapacitiveSensor   upSensor = CapacitiveSensor(7,12);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil
    CapacitiveSensor   downSensor = CapacitiveSensor(4,6);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil

    String keyboardArrows[5] = {"selectBtn", "leftBtn", "rightBtn", "upBtn", "downBtn"};
    boolean currentSensorPressed[5] = {false, false, false, false, false};
    boolean previousSensorPressed[5] = {false, false, false, false, false};
  
    void trigger(String arrow, int keyboardNumber) {
      currentSensorPressed[keyboardNumber] = true;  
    }
    
  public:
    void detectActivity() {
      long selectBtn =  selectSensor.capacitiveSensor(30);
      long leftBtn =  leftSensor.capacitiveSensor(30);
      long rightBtn =  rightSensor.capacitiveSensor(30);
      long upBtn =  upSensor.capacitiveSensor(30);
      long downBtn =  downSensor.capacitiveSensor(30);
      
      long btns[] = {selectBtn, leftBtn, rightBtn, upBtn, downBtn}; 
        // loop through each button sensor
      for (int y = 0; y < 5; y++) {
        // if the sensor has not been pressed
        if(currentSensorPressed[y] == false) {
          // and if that sensors value is equal to or above 200
          if (btns[y] >= 200) {
            // trigger a keyboard button to be pressed
            trigger(keyboardArrows[y], y); 
          }
        } else if(currentSensorPressed[y] == true && btns[y] < 200) {
          currentSensorPressed[y] = false;
        }
      }
//      printValues(btns);
    }
    
    String checkActive() {
      for(int x = 0; x < 5; x++) {
        // if sensor is pressed for first time
        if(currentSensorPressed[x] == true && previousSensorPressed[x] == false) {
         previousSensorPressed[x] = true;
         return keyboardArrows[x];  
         // if sensor has been pressed once and is trying to repeat
        } else if (currentSensorPressed[x] == true && previousSensorPressed[x] == true) {
          // return null
        // if sensor is no longer pressed
        } else if (currentSensorPressed[x] == false) {
         previousSensorPressed[x] = false; 
        }
      }
      return "";
    }    
};

//    void printValues(long btns[]) {
//        Serial.print(btns[0]);                  // print sensor output 1
//        Serial.print("\t");
//        Serial.print(btns[1]);                  // print sensor output 2
//        Serial.print("\t");
//        Serial.print(btns[2]);                  // print sensor output 2
//        Serial.print("\t");
//        Serial.print(btns[3]);                  // print sensor output 2
//        Serial.print("\t");
//        Serial.println(btns[4]);                // print sensor output 3
    //    delay(10);                             // arbitrary delay to limit data to serial port 
//    }
