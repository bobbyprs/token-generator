import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Box, Stack, Typography } from "@mui/material";

// Helper function to split tokens into rows based on perRow
const splitIntoRows = (tokens, perRow) => {
  const rows = [];
  for (let i = 0; i < tokens.length; i += perRow) {
    rows.push(tokens.slice(i, i + perRow));
  }
  return rows;
};

const TokenGenerator = () => {
  const [blueTokens, setBlueTokens] = useState([]);
  const [redTokens, setRedTokens] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      blueCount: "",
      bluePrefix: "",
      bluePerRow: "",
      redCount: "",
      redPrefix: "",
      redPerRow: "",
    },
  });

  const generateTokens = (data) => {
    const {
      blueCount,
      bluePrefix,
      bluePerRow,
      redCount,
      redPrefix,
      redPerRow,
    } = data;

    // Generate blue and red tokens
    const blue = Array.from(
      { length: parseInt(blueCount) },
      (_, i) => `${bluePrefix}${i + 1}`
    );
    const red = Array.from(
      { length: parseInt(redCount) },
      (_, i) => `${redPrefix}${i + 1}`
    );
    // Set tokens based on the input
    setBlueTokens(splitIntoRows(blue, parseInt(bluePerRow)));
    setRedTokens(splitIntoRows(red, parseInt(redPerRow)));
  };

  const clearTokens = () => {
    setBlueTokens([]);
    setRedTokens([]);
    reset(); // Clear form values
  };

  return (
    <Box sx={{ p: 3 ,width:'50%'}}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Token Generator Application
      </Typography>

      <form onSubmit={handleSubmit(generateTokens)}>
        <Stack spacing={2} sx={{ mb: 2 }}>
          {/* Blue Token Fields */}
          <TextField
            label="Number of blue tokens"
            {...register("blueCount", {
              required: "Number of blue tokens is required",
              min: { value: 1, message: "Must be at least 1 blue token is required" },
            })}
            error={!!errors.blueCount}
            helperText={errors.blueCount?.message}
            type="number"
            fullWidth
          />
          <TextField
            label="Blue token prefix"
            {...register("bluePrefix", {
              required: "Blue token prefix is required",
            })}
            error={!!errors.bluePrefix}
            helperText={errors.bluePrefix?.message}
            fullWidth
          />
          <TextField
            label="Blue tokens per row"
            {...register("bluePerRow", {
              required: "Blue tokens per row is required",
              min: { value: 1, message: "Must be at least 1 row blue token is required" },
            })}
            error={!!errors.bluePerRow}
            helperText={errors.bluePerRow?.message}
            type="number"
            fullWidth
          />

          {/* Red Token Fields */}
          <TextField
            label="Number of red tokens"
            {...register("redCount", {
              required: "Number of red tokens is required",
              min: { value: 1, message: "Must be at least 1 red tokens is required" },
            })}
            error={!!errors.redCount}
            helperText={errors.redCount?.message}
            type="number"
            fullWidth
          />
          <TextField
            label="Red token prefix"
            {...register("redPrefix", {
              required: "Red token prefix is required",
            })}
            error={!!errors.redPrefix}
            helperText={errors.redPrefix?.message}
            fullWidth
          />
          <TextField
            label="Red tokens per row"
            {...register("redPerRow", {
              required: "Red tokens per row is required",
              min: { value: 1, message: "Must be at least 1 row red token is required" },
            })}
            error={!!errors.redPerRow}
            helperText={errors.redPerRow?.message}
            type="number"
            fullWidth
          />
        </Stack>

        {/* Generate and Clear Buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Generate
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearTokens}>
            Clear
          </Button>
        </Stack>
      </form>

      {/* Token Display */}
      <Typography variant="h6">Blue Tokens:</Typography>
      <Box>
        {blueTokens.map((row, idx) => (
          <Box key={idx} sx={{ display: "flex", gap: 2 }}>
            {row.map((token, i) => (
              <Box
                key={i}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "blue",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  margin: "2px",
                }}
              >
                {token}
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Red Tokens:
      </Typography>
      <Box sx={{ flexWrap: "wrap", gap: 2 }}>
        {redTokens.map((row, idx) => (
          <Box key={idx} sx={{ display: "flex", gap: 2 }}>
            {row.map((token, i) => (
              <Box
                key={i}
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "red",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  margin: "2px",
                }}
              >
                {token}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TokenGenerator;
