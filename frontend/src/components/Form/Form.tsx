import React, { Fragment, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Form.css";

import { Order } from "../../types/order";
import getOrder from "../../graphQL/queries/getOrder";

import { texts } from "../../utils/generalTexts";
import { ERROR } from "../../utils/constants";

const Form = () => {
  const [data, setData] = useState<Order>();

  const [errorResponse, setErrorResponse] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  const onChangeHandler = async (event: any) => {
    setData(undefined);
    setErrorResponse("");
    const { value } = event.target;
    setOrderId(value);
  };

  const onClickHandler = async (event: any) => {
    getOrderQuery({
      variables: {
        id: orderId,
      },
    });
  };

  const [getOrderQuery, { loading }] = useLazyQuery(getOrder, {
    fetchPolicy: "network-only",
    onCompleted: (response: any) => {
      if (!!response.getOrder) {
        setData(response.getOrder);
      }
    },
    onError: () => {
      setErrorResponse(ERROR);
    },
  });

  return (
    <Fragment>
      <div className={"title_container"}>
        <span className={"title_text"}>{texts.getOrder.title}</span>
      </div>
      <div className={"form_container"}>
        <div className={"input_row"}>
          <input
            type={"text"}
            value={orderId}
            onChange={onChangeHandler}
            placeholder={texts.getOrder.inputPlaceholder}
          />
          <Button
            variant="primary"
            disabled={orderId.length < 24}
            onClick={onClickHandler}
            className={"form-element"}
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {"Search"}
          </Button>
        </div>
        {data && (
          <div className="results_container">
            <div>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}
        {errorResponse.length > 0 && (
          <div className="error_container">
            <p>{errorResponse}</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Form;
