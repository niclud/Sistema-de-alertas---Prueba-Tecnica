SELECT c.ID, c.Nombre, c.Apellido, SUM(v.Importe) as Total_Compras_12_meses
FROM Clientes c
INNER JOIN Ventas v ON c.ID = v.Id_cliente
WHERE v.Fecha >= DATE_SUB(NOW(), INTERVAL 12 MONTH) 
GROUP BY c.ID
HAVING SUM(v.Importe) > 100000;