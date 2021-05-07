import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { FormEvent, useReducer, Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { login } from "../utils";

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false
};

type State = typeof initialState;

enum ActionTypes {
  LOGIN = "login",
  LOGOUT = "logout",
  ERROR = "error",
  TYPING = "typing",
  SUCCESS = "success"
}

type Field = "username" | "password";

interface LoginAction {
  type: ActionTypes.LOGIN;
}
interface LogoutAction {
  type: ActionTypes.LOGOUT;
}
interface ErrorAction {
  type: ActionTypes.ERROR;
  payload: string;
}
interface OnChangeAction {
  type: ActionTypes.TYPING;
  payload: {
    field: Field;
    value: string;
  };
}
interface SuccessAction {
  type: ActionTypes.SUCCESS;
}

type Action =
  | LogoutAction
  | LoginAction
  | ErrorAction
  | OnChangeAction
  | SuccessAction;

const loginReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case ActionTypes.SUCCESS:
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: "",
        isLoggedIn: true
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: "",
        isLoggedIn: false
      };
    case ActionTypes.TYPING:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        isLoading: false
      };
    default:
      return state;
  }
};

const LoginApp: React.FC<RouteComponentProps<{}>> = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, error, isLoading, isLoggedIn } = state;
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: ActionTypes.LOGIN });

      await login(username, password);
      dispatch({ type: ActionTypes.SUCCESS });
    } catch (error) {
      dispatch({
        type: ActionTypes.ERROR,
        payload: "Username or password is incorrect"
      });
    }
  };

  const handleLogout = (): void => {
    dispatch({ type: ActionTypes.LOGOUT });
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {isLoggedIn ? (
            <Fragment>
              <h1>Hi User</h1>
              <Button
                disabled={isLoading}
                variant="primary"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Fragment>
          ) : (
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="username">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  type="text"
                  placeholder="Enter username"
                  onChange={e =>
                    dispatch({
                      type: ActionTypes.TYPING,
                      payload: { field: "username", value: e.target.value }
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={e =>
                    dispatch({
                      type: ActionTypes.TYPING,
                      payload: { field: "password", value: e.target.value }
                    })
                  }
                />
              </Form.Group>

              <Button disabled={isLoading} variant="primary" type="submit">
                Log In
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginApp;
