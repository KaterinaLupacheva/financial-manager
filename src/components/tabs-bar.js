import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import tabsBarStyles from "../styles/tabs-bar.styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(tabsBarStyles);

const TabsBar = ({ tabs }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{
          root: classes.tabsRoot,
          indicator: classes.displayNone,
          scrollButtons: classes.displayNone
        }}
      >
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon) {
            icon = {
              icon: <prop.tabIcon />
            };
          }
          return (
            <Tab
              key={key}
              label={prop.tabName}
              {...icon}
              classes={{
                root: classes.tabRootButton,
                selected: classes.tabSelected,
                wrapper: classes.tabWrapper
              }}
            />
          );
        })}
      </Tabs>
      <Card
        raised={true}
        classes={{
          root: classes.cardStyles
        }}
      >
        <CardContent>
          {tabs.map((prop, key) => {
            if (key === value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default TabsBar;
