class WebSerial {
    constructor() {
      this.reader = null;
      this.writer = null;
      this.port = null;
    }


    async readSerial() {
        function areBracesBalanced(str) {
            const openBraces = [];
            for (const char of str) {
              if (char === '{') {
                openBraces.push(char);
              } else if (char === '}') {
                if (openBraces.length === 0) {
                  return false; // Unbalanced braces
                }
                openBraces.pop();
              }
            }
            return openBraces.length === 0;
          }

        try {
            let receivedData = ''; // Variable to accumulate received data
          
            const timeout = setTimeout(() => {
              console.log('Timeout reached. Exiting the loop.');
              // Perform any necessary actions when the timeout is reached
            }, 100);
          
            while (true) {
              const { value, done } = await this.reader.read();
              if (done) break;
              const decoder = new TextDecoder();
              const partialData = decoder.decode(value);
              receivedData += partialData; // Append the partial data to the accumulator
          
              console.log('Partial data received:', partialData);
          
              if (areBracesBalanced(receivedData)) {
                console.log('All braces are closed in pairs. Exiting the loop.');
                break;
              }
            }
          
            clearTimeout(timeout); // Clear the timeout
          
            console.log('Data received:', receivedData);
            Node_jsonObjects =  JSON.parse(receivedData);
            renderTable(Node_jsonObjects);


            // Do something with the accumulated data
          } catch (error) {
            console.error('Error reading from serial port:', error);
          }
          

      }
  
  async connect(baudRate) {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate , bufferSize:1024});
      const { readable, writable } = port;
      this.reader = readable.getReader();
      this.writer = writable.getWriter();
      this.port = port;
      console.log('Serial port connected.');
    } catch (error) {
      console.error('Error connecting to serial port:', error);
    }
    this.readSerial();
  }
  
  async writeSerial(data) {
    try {
      const encoder = new TextEncoder();
      const dataArrayBuffer = encoder.encode(data);
      await this.writer.write(dataArrayBuffer);
      console.log('Data sent:', data);
    } catch (error) {
      console.error('Error writing to serial port:', error);
    }
  }

  async closeSerial() {
    try {
      await this.writer.close();
      await this.reader.cancel();
      await this.reader.releaseLock();
      await this.port.close();
      console.log('port closed');
    } catch (error) {
      console.error('Error writing to serial port:', error);
    }
  }
  
  


  
  
  }

  async function disconnectSerial() {
    await webSerial.closeSerial();
    }


  async function WriteCMD(text) {
    await webSerial.writeSerial(text);
    }
  
  async function openSerial(baudRate) {
    await webSerial.connect(baudRate);
    }
async function GetNodeNo() {
    await webSerial.writeSerial("AT+GETNODENO\n");
    }
async function GetNodeList() {
        await webSerial.writeSerial("AT+GETNODELIST\n");
        }
async function SendFireAlert() {  
    const jsonString = '{"node":"999","title":"Lunch","time":"12:00 ~ 12:00","venue":"Meeting Room A","content":"LCD Workpass Testing","special":1}\n';
    await webSerial.writeSerial(jsonString);
    }


async function SendLightingAlert() {  
    const jsonString = '{"node":"999","title":"Lunch","time":"12:00 ~ 12:00","venue":"Meeting Room A","content":"LCD Workpass Testing","special":2}\n';
    await webSerial.writeSerial(jsonString);
    }