#include <DHT.h>

#define DHTPIN 2     // Digital pin connected to the DHT11
#define DHTTYPE DHT11   
#define SOIL_MOISTURE_PIN A0
#define RELAY_PIN 8
#define THRESHOLD 300 // Adjust based on your sensor calibration

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Pump OFF initially
  dht.begin();
}

void loop() {
  // Read DHT11
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Read Soil Moisture
  int soilMoistureRaw = analogRead(SOIL_MOISTURE_PIN);
  int soilMoisturePercent = map(soilMoistureRaw, 1023, 0, 0, 100);

  bool pumpOn = false;
  
  // Irrigation Logic
  if (soilMoisturePercent < 30) {
    digitalWrite(RELAY_PIN, HIGH);
    pumpOn = true;
  } else {
    digitalWrite(RELAY_PIN, LOW);
    pumpOn = false;
  }

  // Send data to Serial: moisture,temp,humidity,pumpStatus
  Serial.print(soilMoisturePercent);
  Serial.print(",");
  Serial.print(t);
  Serial.print(",");
  Serial.print(h);
  Serial.print(",");
  Serial.println(pumpOn ? 1 : 0);

  delay(2000); // Wait for sensors
}
