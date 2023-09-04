import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Global/Button";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
    console.log("Redirecting...");
  };
  useEffect(() => {
    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
      <div>
        <div className={styles.divbtnone}>
          <Button
            classname={styles.myButtonone}
            text="식품정보"
            onClick={() => navigateTo("/nutrients")}
          />

          <Button
            classname={styles.myButtontwo}
            text="유통기한"
            onClick={() => navigateTo("/expiration")}
          />
        </div>
        <div className={styles.divbtntwo}>
          <Button
            classname={styles.myButtonone}
            text="분리배출"
            onClick={() => navigateTo("/recycle")}
          />
          <Button
            classname={styles.myButtontwo}
            text="알레르기"
            onClick={() => navigateTo("/allergy")}
          />
        </div>
        <div className={styles.divbtnthree}>
          <Button
            classname={styles.myButtonone}
            text="도움말"
            onClick={() => navigateTo("/help")}
          />
          <Button
            classname={styles.myButtontwo}
            text="설정"
            onClick={() => navigateTo("/settings")}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
