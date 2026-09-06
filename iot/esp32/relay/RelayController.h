#ifndef RELAY_CONTROLLER_H
#define RELAY_CONTROLLER_H

#include "../firmware/PinMap.h"

class RelayController {
private:
    bool state;
public:
    RelayController();
    void begin();
    void turnOn();
    void turnOff();
    bool getState();
};

#endif
