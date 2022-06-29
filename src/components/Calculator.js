import React, { useState } from 'react'
import { Container, Screen, Previous, Current, Button } from '../Styles/styles';

function Calculator() {

    const [current, setCurrent] = useState('');
    const [previous, setPrevious] = useState('');
    const [operations, setOperations] = useState('');

    const appendValueHandler = (e) => {

        const value = e.target.getAttribute("data");
        if (value === "." && current.includes(".")) return;
        setCurrent(current + value);
        //console.log(value);
    };

    const deleteHandler = () => {
        setCurrent(String(current).slice(0, -1))
    };

    const allClearHandler = () => {
        setCurrent('');
        setOperations('');
        setPrevious('');
    };

    const chooseOperationHandler = (e) => {
        if (current === "") return;
        if (previous !== "") {
            let value = compute();
            setPrevious(value);
        } else {
            setPrevious(current)
        }
        setCurrent("");
        setOperations(e.target.getAttribute("data"));
    };

    const equalHandler=()=>{
        let value= compute();
        if(value === undefined || value=== null) return;
        setCurrent(value);
        setOperations('');
        setPrevious('');
    }

    const compute = () => {
        let result;
        let previousNumber = parseFloat(previous);
        let currentNumber = parseFloat(current);
        if (isNaN(previousNumber) || isNaN(currentNumber)) return;
        switch (operations) {
            case '÷':
                result = previousNumber / currentNumber;
                break;
            case '+':
                result = previousNumber + currentNumber;
                break;
            case '-':
                result = previousNumber - currentNumber;
                break;
            case 'x':
                result = previousNumber * currentNumber;
                break;
                default: return;
        }
        return result;
    }

    return (
        <>
            <Container>
                <Screen>
                    <Previous>{previous} {operations}</Previous>
                    <Current>{current}</Current>
                </Screen>
                <Button gridSpan={2} control onClick={allClearHandler}>AC</Button>
                <Button control onClick={deleteHandler}>DEL</Button>
                <Button operation data={'÷'} onClick={chooseOperationHandler}>÷</Button>
                <Button onClick={appendValueHandler} data={7}>7</Button>
                <Button onClick={appendValueHandler} data={8}>8</Button>
                <Button onClick={appendValueHandler} data={9}>9</Button>
                <Button operation data={'x'} onClick={chooseOperationHandler}>x</Button>
                <Button onClick={appendValueHandler} data={4}>4</Button>
                <Button onClick={appendValueHandler} data={5}>5</Button>
                <Button onClick={appendValueHandler} data={6}>6</Button>
                <Button operation data={'+'} onClick={chooseOperationHandler}>+</Button>
                <Button onClick={appendValueHandler} data={3}>3</Button>
                <Button onClick={appendValueHandler} data={2}>2</Button>
                <Button onClick={appendValueHandler} data={1}>1</Button>
                <Button operation data={'-'} onClick={chooseOperationHandler}>-</Button>
                <Button decimal onClick={appendValueHandler} data={"."}>.</Button>
                <Button onClick={appendValueHandler} data={0}>0</Button>
                <Button gridSpan={2} equal onClick={equalHandler}>=</Button>

            </Container>
        </>
    )
}

export default Calculator