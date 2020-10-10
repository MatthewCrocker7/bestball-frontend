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

const useStyles = makeStyles(styles);

const TeamRoundTable = (props) => {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  if (!tableData) return;
  if (!tableHead) return;

  const determineClassName = (cell) => {
    if (!cell.holeNumber) {
        return classes.tableCell;
    }

    switch (cell.scoreType) {
        case 'BIRDIE':
            return classes.eagleCell;
        case 'EAGLE':
            return classes.eagleCell;
        case 'BOGEY':
            return classes.doubleBogeyCell;
        case 'DOUBLE_BOGEY':
            return classes.doubleBogeyCell;
        case 'TRIPLE_BOGEY':
            return classes.doubleBogeyCell;
        case 'PLUS_TRIPLE':
            return classes.doubleBogeyCell;
        default:
            return classes.tableCell;
    }
  };

  const renderCell = (cell, key, row) => {
      return (
          <TableCell key={key} info={row} align="center" className={determineClassName(cell)}>
              {cell.holeNumber ? cell.strokes : cell}
          </TableCell>
      )
  };

  return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ?
              tableHead.map((item, key) => {
                return (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]} key={key} >
                      <TableRow className={classes.tableHeadRow} key={key} >
                        {item.map((prop, key2) => {
                          return (
                              <TableCell
                                  className={classes.tableCell + " " + classes.tableHeadCell}
                                  key={key2} align="center"
                              >
                                {prop}
                              </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                );
              })
           : null}
          <TableBody>
            {tableData !== undefined ?
                tableData.map((row, key) => {
                  return (
                      <TableRow key={key} className={classes.tableBodyRow}>
                        {row.map((cell, key) => {
                          return (
                              renderCell(cell, key, row)
                          );
                        })}
                      </TableRow>
                  );
            })
            : null}
          </TableBody>
        </Table>
      </div>
  );
};

/*


 */

TeamRoundTable.defaultProps = {
  tableHeaderColor: "gray"
};

TeamRoundTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.array),
};

export default TeamRoundTable;
