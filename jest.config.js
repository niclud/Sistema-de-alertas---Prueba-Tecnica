module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
 
    testPathIgnorePatterns: [
      "/node_modules/", 
      "/\\.vscode/",    
    ],
    moduleNameMapper: {
    // Elimina las extensiones .ts de las rutas de importación
    '(.*)\\.ts$': '$1'
  },

};