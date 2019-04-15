#include <Arduino.h>
#include "Keyboard.h"

class KeyboardClass {
  private: 
    // keyboard buttons
    String keyboardArrows[5] = {"selectBtn", "leftBtn", "rightBtn", "upBtn", "downBtn"};
    // array for key presses that aligns with keyboardArrows[]
    byte keys[5] = {'f', 'a', 'd', 'w', 's'};
  public: 
    void press(String sensorPressed) {
      // loop through all keyboardArrows
      for (int x = 0; x < 5; x++) {
        if(sensorPressed == keyboardArrows[x]) {
          Keyboard.press(keys[x]);
        }
      }
       Keyboard.releaseAll();
    }
};
