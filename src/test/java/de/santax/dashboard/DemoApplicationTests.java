package de.santax.dashboard;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


class DemoApplicationTests {

	CalculatorTest underTest = new CalculatorTest();

	@Test
	void itShouldAddNumbers() {

		//given
		int numberOne = 20;
		int numberTwo = 30;

		//when
		int result = underTest.add(numberOne, numberTwo);

		//then
		assertThat(result).isEqualTo(50);

	}

	class CalculatorTest {
		int add(int a, int b) {
			return a + b;
		}
	}

}
