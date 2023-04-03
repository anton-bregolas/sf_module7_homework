// Задание 4.

// Определите иерархию электроприборов. Включите некоторые в розетку. 
// Посчитайте суммарную потребляемую мощность всех включенных приборов (передайте аргумент). 
// Таких приборов должно быть как минимум два (например, настольная лампа и компьютер). 
// Выбрав прибор, подумайте, какими свойствами он обладает.

// Household device energy consumption calculator v.0.1
//
// Prototypes: Device <- ElectronicDevice
//
// Devices: Heater, Fridge, Old AC
// ElectronicDevices: Laptop, Laptop(2)
//
// Device.prototype methods:
//
// - showDevicePower - in-built method printing the device's current power value to the console
// - showDeviceState - in-built method printing the device's on/off status to the console
// - updateDeviceList: adds a device to the list of active devices after checking if it's switched on
// - clearDeviceList: removes a device from the list of active devices after checking if it's on the list
// - refreshDeviceList: removes and then re-adds a device that is already switched on [to refresh its properties]
// - pressSwitch: switches the device on or off, updates or clears the device list accordingly
// - adjustPower: changes power knob setting for electric appliances (not for electronic devices), refreshes the list
// - getActivePower: returns device's currently set power in Watt-hours, returns 0 if switched off
// - setActiveUseTime: writes the expected number of hours and days the device will be used for future calculations
//
// ElectronicDevice.prototype methods:
//
// - showEcoMode: in-built method printing the power saving mode status to the console
// - setEcoMode: switches the power saving mode on or off (for electronic devices only), refreshes the list
// - setActiveIdleUseTime: writes the expected hours and days of use, as well as idle hours, to the selected electronic device
//
// Special functions:
//
// - calcCurrentActivePower: calculates the total power consumption of currently active devices (from the list)
// - calcTotalActivePower: switches on the user-specified devices and calculates their total power consumption
// - calcEnergyConsumption: calculates the total power consumption of one device over the pre-set period of hours and days
// - calcTotalEnergyConsumption: calculates the total power consumed by the devices on activeDeviceList using pre-set hours


function Device(name, state, power) {

    this.deviceName = name;
    this.deviceState = state;
    this.deviceMaxPower = power;
    this.devicePower = this.deviceMaxPower;
    this.itemType = "device";
    this.deviceType = "electric appliance";

    this.updateDeviceList();

    this.showDevicePower = function () {
        console.log(`This ${this.deviceType} consumes ${Math.round(this.devicePower)} Watt-hour of power`);
    }
    this.showDeviceState = function () {
        console.log(`This ${this.deviceName} is currently ${this.deviceState}.`);
    }

}

const activeDeviceList = [];

Device.prototype.updateDeviceList = function () {

    if (this.deviceState == "on" || this.deviceState == 1) {
        activeDeviceList.push(this);
    }

}

Device.prototype.clearDeviceList = function () {

    let i = activeDeviceList.indexOf(this);

    if (i != -1) {
        activeDeviceList.splice(i, 1);
    }

}

Device.prototype.refreshDeviceList = function () {

    if (this.deviceStatus = "on" || this.deviceStatus == 1) {

        this.clearDeviceList();
        this.updateDeviceList();

    }
}

Device.prototype.pressSwitch = function () {

    if (this.deviceState == "on" || this.deviceState == 1) {

        this.deviceState = "off";
        this.clearDeviceList();
        return "off";
    }

    this.deviceState = "on";
    this.updateDeviceList();
    return "on";

}

Device.prototype.adjustPower = function (setting = 10) {

    if (ElectronicDevice.prototype.isPrototypeOf(this)) {
        console.log(`This is a ${this.deviceName}, it doesn't have a power knob!`);
        return;
    }

    this.devicePower = this.deviceMaxPower * (setting / 10);

    this.refreshDeviceList();

    console.log(`This ${this.deviceName} is at power setting ${setting}, consuming ${Math.round(this.devicePower)} Watt-hour of energy.`);
    return this.devicePower;

}

Device.prototype.getActivePower = function () {

    return this.deviceState == "off" ? 0 : this.devicePower;

}

function calcCurrentActivePower() {

    let deviceCurrentPowerTotal = 0;

    for (let device of activeDeviceList) {

        deviceCurrentPowerTotal += device.devicePower;
    }

    deviceCurrentPowerTotal = Math.round(deviceCurrentPowerTotal);

    console.log(`The total power of active devices is currently ${deviceCurrentPowerTotal} Watt-hour.`);
    return deviceCurrentPowerTotal;

}

function calcTotalActivePowerOf(...devices) {

    let devicePowerTotal = 0;

    for (const device of devices) {

        if (device.deviceState == "off") {

            device.pressSwitch();

        }

        devicePowerTotal += device.getActivePower();
    }

    devicePowerTotal = Math.round(devicePowerTotal);

    console.log(`${devices.length} devices were selected and switched on; their total power is ${devicePowerTotal} Watt-hour.`);
    return devicePowerTotal;

}

Device.prototype.setActiveUseTime = function (hours_used = 0, days_used = 1) {

    this.deviceHoursUsed = hours_used;
    this.deviceDaysUsed = days_used;

}

Device.prototype.calcEnergyConsumption = function () {

    let totalEnergyConsumed = (this.devicePower * this.deviceHoursUsed * this.deviceDaysUsed) / 1000;

    if (ElectronicDevice.prototype.isPrototypeOf(this) && this.deviceIdleDailyHours > 0) {

        let idleEnergyConsumed = (this.devicePower / 20 * this.deviceIdleDailyHours * this.deviceDaysUsed) / 1000;
        totalEnergyConsumed += idleEnergyConsumed;

    }

    console.log(`This ${this.deviceName} consumes ${totalEnergyConsumed.toFixed(2)} kWh a month.`);
    return totalEnergyConsumed;
}

function calcTotalEnergyConsumption() {

    let deviceMonthlyPowerTotal = 0;

    for (let device of activeDeviceList) {

        if (device.deviceHoursUsed > 0) {

            if (ElectronicDevice.prototype.isPrototypeOf(device) && this.deviceIdleDailyHours > 0) {

                let idleEnergyConsumed = (this.devicePower / 20 * this.deviceIdleDailyHours * this.deviceDaysUsed);

                deviceMonthlyPowerTotal += idleEnergyConsumed;

            }

            deviceMonthlyPowerTotal += (device.devicePower * device.deviceHoursUsed * device.deviceDaysUsed);
        }
    }

    deviceMonthlyPowerTotal = deviceMonthlyPowerTotal / 1000;

    console.log(`All of the active devices combined consume a whopping ${deviceMonthlyPowerTotal.toFixed(2)} kWh a month.`);
    return deviceMonthlyPowerTotal;

}

ElectronicDevice.prototype = new Device();

function ElectronicDevice(name, state, power) {

    this.deviceName = name;
    this.deviceState = state;
    this.deviceMaxPower = power;
    this.devicePower = this.deviceMaxPower;
    this.deviceType = "electronic device";
    this.deviceEcoMode = "off";

    this.updateDeviceList();

    this.showEcoMode = function () {
        console.log(`This ${this.deviceName}'s power saving mode is currently ${this.deviceEcoMode}.`);
    }
}

ElectronicDevice.prototype.setEcoMode = function () {

    if (this.deviceEcoMode == "off") {

        this.deviceEcoMode = "on";
        this.devicePower = this.deviceMaxPower / 2;
        this.refreshDeviceList();

        console.log(`This ${this.deviceName} is in power saving mode, consuming ${Math.round(this.devicePower)} Watt-hour of energy.`);
        return true;
    }

    this.deviceEcoMode = "off";
    this.devicePower = this.deviceMaxPower;
    this.refreshDeviceList();

    console.log(`This ${this.deviceName} is in full power mode, consuming ${Math.round(this.devicePower)} Watt-hour of energy.`);
    return false;
}

ElectronicDevice.prototype.setActiveIdleUseTime = function (hours_used = 0, days_used = 0, idle_daily_hours = 0) {

    if (idle_daily_hours > 0) {

        hours_used = hours_used - idle_daily_hours;
        this.deviceIdleDailyHours = idle_daily_hours;
    }

    this.deviceHoursUsed = hours_used;
    this.deviceDaysUsed = days_used;

}


// Devices defined, max power settings assigned...
// activeDeviceList updated...

const heater = new Device('Heater', 'on', 2500);
const laptop = new ElectronicDevice('Laptop', 'on', 86);
const fridge = new Device('Fridge', 'on', 1000 / 24);
const oldac = new Device('Old AC', 'off', 2000);
const laptop2 = new ElectronicDevice('Laptop', 'off', 30);

// Adjusting power setting or switching on power saving mode...
// activeDeviceList refreshed...

heater.adjustPower(5);
fridge.adjustPower(6);
laptop.setEcoMode();

// Getting total power of currently active devices...
// activeDeviceList read...

calcCurrentActivePower();

// A specified list of devices switched on and their total active power calculated...

calcTotalActivePowerOf(laptop, heater, fridge, oldac, laptop2);

// Write the total no. of hours and days the selected devices will be used for future calculations...

heater.setActiveUseTime(8, 30);
fridge.setActiveUseTime(24, 30);
oldac.setActiveUseTime(2, 15);
laptop.setActiveIdleUseTime(12, 25, 2);
laptop2.setActiveIdleUseTime(10, 20, 5);

// Calculate total energy consumption of the devices specified [over the period of hours, days]...

heater.calcEnergyConsumption();
fridge.calcEnergyConsumption();
oldac.calcEnergyConsumption();
laptop.calcEnergyConsumption();
laptop2.calcEnergyConsumption();

// Total energy consumed by all of the devices on the activeDeviceList...

calcTotalEnergyConsumption();

