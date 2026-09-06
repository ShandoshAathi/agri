#ifndef ARDUINO_H
#define ARDUINO_H

#include <stdint.h>
#include <stdbool.h>
#include <math.h>
#include <string.h>
#include <algorithm>

typedef uint8_t byte;

#include <string>

class String : public std::string {
public:
    String() : std::string() {}
    String(const char* s) : std::string(s ? s : "") {}
    String(const std::string& s) : std::string(s) {}
    String(char c) : std::string(1, c) {}
    String& operator+=(char c) { push_back(c); return *this; }
};

#define HIGH 0x1
#define LOW  0x0

#define INPUT 0x0
#define OUTPUT 0x1
#define INPUT_PULLUP 0x2

#define WL_CONNECTED 3

void pinMode(uint8_t pin, uint8_t mode);
void digitalWrite(uint8_t pin, uint8_t val);
int digitalRead(uint8_t pin);
int analogRead(uint8_t pin);
void analogWrite(uint8_t pin, int val);

unsigned long millis(void);
unsigned long micros(void);
void delay(unsigned long ms);
void delayMicroseconds(unsigned int us);

inline long map(long x, long in_min, long in_max, long out_min, long out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

using std::min;
using std::max;

class HardwareSerial {
public:
    void begin(unsigned long baud);
    void print(const char* s);
    void print(int n);
    void print(float f);
    void println(const char* s = "");
    void println(int n);
    void println(float f);
    void println(const class IPAddress& ip);
    size_t printf(const char * format, ...);
};

extern HardwareSerial Serial;

#endif
