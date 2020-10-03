import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";

import { useHistory } from "react-router-dom";
const useStyles = makeStyles(styles);

const TeamInfoTable = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { tableHead, tableData, tableHeaderColor } = props;

  const handleRowSelect = (e, info) => {
    if (info.isDraft) {
      history.push(`/home/drafts/draft?draftId=${info.draftId}`,
          { draftId: info.draftId }
      );
    } else {
      history.push(`/home/games/game?gameId=${info.gameId}`,
          { gameId: info.gameId }
      );
    }

  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((row, key) => {
            return (
              <TableRow key={key} hover={true} className={classes.teamInfoBodyRow}
                        value={row} onClick={(event) => handleRowSelect(event, row)}>
                {row.cellData.map((cell, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key} info={row}>
                      {cell}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

TeamInfoTable.defaultProps = {
  tableHeaderColor: "gray"
};

TeamInfoTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};

export default TeamInfoTable;
