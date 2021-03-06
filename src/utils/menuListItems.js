import React from "react";
import DateRangeIcon from "@material-ui/icons/DateRange";
import TableChartIcon from "@material-ui/icons/TableChart";
import BarChartIcon from "@material-ui/icons/BarChart";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

export const MENU_LIST_ITEMS = [
  {
    name: "Month",
    icon: <DateRangeIcon />,
    route: "/month"
  },
  {
    name: "Pivot Table",
    icon: <TableChartIcon />,
    route: "/table"
  },
  {
    name: "Charts",
    icon: <BarChartIcon />,
    route: "/charts"
  },
  {
    name: "Budget",
    icon: <AccountBalanceWalletIcon />,
    route: "/budget"
  }
];
