"use client";
import { Alert, styled } from "@mui/material";

export const AlertaSnackbar = styled(Alert)`
  font-size: 13px;
  font-weight: 600;
  align-items: center;

  &.MuiAlert-filledError {
    background: #d64545;
    color: #14171c;
  }

  &.MuiAlert-filledSuccess {
    background: #4f7965;
    color: #14171c;
  }

  .MuiAlert-icon {
    color: #fff;
  }
`;
