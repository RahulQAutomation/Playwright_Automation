export class TestLogger {
  static log(message: string) {
    console.log(`✓ ${message}`);
  }

  static info(message: string) {
    console.log(`ℹ ${message}`);
  }

  static warn(message: string) {
    console.log(`⚠ ${message}`);
  }

  static error(message: string) {
    console.log(`❌ ${message}`);
  }

  static testStart(testName: string) {
    console.log(`\n🧪 Started: ${testName}`);
  }

  static testPass(testName: string) {
    console.log(`✅ PASSED: ${testName}`);
  }

  static testFail(testName: string) {
    console.log(`❌ FAILED: ${testName}`);
  }
}
