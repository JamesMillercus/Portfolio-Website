//#include <ADCTouch.h>
#include <TrinketKeyboard.h>

int leftArrow;     //reference values to remove offset
boolean led = 0;

void setup() {
    // No pins to setup, pins can still be used regularly, although it will affect readings
    
    TrinketKeyboard.begin();
//    leftArrow = ADCTouch.read(2, 500);    //create reference values to 
    pinMode(0, OUTPUT);
} 

void loop()
{
  // the poll function must be called at least once every 10 ms
  // or cause a keystroke
  // if it is not, then the computer may think that the device
  // has stopped working, and give errors
//  TrinketKeyboard.poll();
//  int value0 = ADCTouch.read(2);
//  value0 -= leftArrow;       //remove offset
//  TrinketKeyboard.print("test");
  digitalWrite(0, HIGH);
  TrinketKeyboard.pressKey(KEYCODE_MOD_LEFT_SHIFT, KEYCODE_A);
    // this should type a capital A
    TrinketKeyboard.pressKey(0, 0);
    // this releases the key
//  led != led;
  delay(1000);
}


