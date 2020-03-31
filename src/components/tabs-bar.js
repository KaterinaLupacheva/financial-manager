import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const TabsBar = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon) {
            icon = {
              icon: <prop.tabIcon />
            };
          }
          return <Tab key={key} label={prop.tabName} {...icon} />;
        })}
      </Tabs>
      <Card>
        <CardContent>
          {tabs.map((prop, key) => {
            if (key === value) {
              return (
                <div key={key}>
                  <Typography variant="h6">{prop.tabTitle}</Typography>
                  {prop.tabContent}
                </div>
              );
            }
            return null;
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default TabsBar;
