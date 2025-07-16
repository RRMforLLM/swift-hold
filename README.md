# Swift Stock

Swift Stock is an inventory management application designed to track uniforms across multiple stores. The application helps manage the distribution and tracking of different types of uniforms, their sizes, and movement between stores.

## Features

- **Operator Management**: Track operators and their associated stores
- **Uniform Inventory**: Keep record of uniforms with their types and sizes
- **Stock Operations**: Monitor uniform movements:
  - Track entries (incoming stock)
  - Track exits (outgoing stock)
  - Record quantities, dates, and store locations

## Database Structure

### Operators
- Store operators with their names (optional)
- Maintain lists of stores associated with each operator

### Uniforms
- Unique identifier for each uniform type
- Track uniform types and sizes

### Operations
- Record all stock movements (entries and exits)
- Track:
  - Type of operation (entry/exit)
  - Associated uniform
  - Store location
  - Quantity
  - Date and time of operation

## Tech Stack

This is a mobile application built with React Native and Expo.
