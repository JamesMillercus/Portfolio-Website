#include <ADCTouch.h>
#include <Keyboard.h>

int leftArrow0, rightArrow1, selectBtn2, backBtn3;     //reference values to remove offset

void setup() {
    // No pins to setup, pins can still be used regularly, although it will affect readings
    Serial.begin(9600);
    leftArrow0 = ADCTouch.read(A0, 500);    //create reference values to 
    rightArrow1 = ADCTouch.read(A1, 500);    //account for the capacitance of the pad
    selectBtn2 = ADCTouch.read(A2, 500);    
    backBtn3 = ADCTouch.read(A3, 500);    
    Keyboard.begin();
} 

void loop() {
    int leftPin0 = ADCTouch.read(A0);   //no second parameter
    int rightPin1 = ADCTouch.read(A1);   //   --> 100 samples
    int selectPin2 = ADCTouch.read(A2);
    int backPin3 = ADCTouch.read(A3);

    leftPin0 -= leftArrow0;       //remove offset
    rightPin1 -= rightArrow1;
    selectPin2 -= selectBtn2;
    backPin3 -= backBtn3;

    readPins(leftPin0, rightPin1, selectPin2, backPin3);
}

void readPins(int leftValue0, int rightValue1, int selectValue2, int backValue3) {

    int touchVals[] = { leftValue0, rightValue1, selectValue2, backValue3 };
    int keyboardVals[] = { 216, 215, 176, 177 };
    int triggerValue = 300;
    for(int x = 0; x < 4; x++){
      if(touchVals[x] > triggerValue) Keyboard.press(keyboardVals[x]);
      else if (touchVals[x] < triggerValue) Keyboard.release(keyboardVals[x]);
    }
}

