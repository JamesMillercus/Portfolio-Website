#include <CapacitiveSensor.h>

int brightness = 0;    // how bright the LED is
int fadeAmount = 5;    // how many points to fade the LED by
int maxBrightness = 10;
int leds[] = {13, 11, 10, 9, 5};

CapacitiveSensor   cs_4_2 = CapacitiveSensor(8,A5);        // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired
CapacitiveSensor   cs_4_6 = CapacitiveSensor(8,A4);        // 10M resistor between pins 4 & 6, pin 6 is sensor pin, add a wire and or foil
CapacitiveSensor   cs_4_8 = CapacitiveSensor(7,A3);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil
CapacitiveSensor   cs_4_9 = CapacitiveSensor(7,12);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil
CapacitiveSensor   cs_4_10 = CapacitiveSensor(4,6);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil


void setup()                    
{
   for(int x = 0; x < sizeof(leds); x++) pinMode(leds[x], OUTPUT);
   cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   Serial.begin(9600);
}

void loop()                    
{

    for(int x = 0; x < sizeof(leds); x++) analogWrite(leds[x], brightness);

    // change the brightness for next time through the loop:
    brightness = brightness + fadeAmount;
  
    // reverse the direction of the fading at the ends of the fade:
    if (brightness <= 0 || brightness >= maxBrightness) fadeAmount = -fadeAmount;
    // wait for 30 milliseconds to see the dimming effect
    delay(200);
  
    long start = millis();
    long total1 =  cs_4_2.capacitiveSensor(30);
    long total2 =  cs_4_6.capacitiveSensor(30);
    long total3 =  cs_4_8.capacitiveSensor(30);
    long total4 =  cs_4_9.capacitiveSensor(30);
    long total5 =  cs_4_10.capacitiveSensor(30);

//    Serial.print(millis() - start);        // check on performance in milliseconds
//    Serial.print("\t");                    // tab character for debug windown spacing

    Serial.print(total1);                  // print sensor output 1
    Serial.print("\t");
    Serial.print(total2);                  // print sensor output 2
    Serial.print("\t");
    Serial.print(total3);                  // print sensor output 2
    Serial.print("\t");
    Serial.print(total4);                  // print sensor output 2
    Serial.print("\t");
    Serial.println(total5);                // print sensor output 3

//    delay(10);                             // arbitrary delay to limit data to serial port 
}
