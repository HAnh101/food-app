import { Link } from "react-router-dom";
import "./authentication.scss"
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

function Authentication() {
    return (
        <main className="authentication">
            <div>
                <UserOutlined />
                <br />
                <span className="title-color">
                    User
                </span>
            </div>
            <div>
                <SettingOutlined />
                <br />
                <span className="title-color">
                    Admin
                </span>
            </div>
        </main>
    )
}

export default Authentication;