<?php
$student = [
    "student_number" => "2026-201123",
    "name" => "Sebastian Gabriel Manano",
    "course" => "BS Information Systems(BSIS)",
    "subjects" => [
        "Web Development",
        "Database Management",
        "Computer Programming",
        "Business Analytics"
    ]
];

$json = json_encode($student, JSON_PRETTY_PRINT);
$data = json_decode($json, true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Profile</title>

    <style>
        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f8fafc;
            color: #333;
            margin: 0;
            padding: 40px 20px;
        }

        .container {
            max-width: 650px;
            margin: auto;
            background: white;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }

        h2 {
            font-size: 24px;
            font-weight: 600;
            margin-top: 0;
            color: #222;
        }

        h3 {
            font-size: 17px;
            font-weight: 600;
            margin-top: 28px;
            margin-bottom: 12px;
            color: #2563eb;
        }

        p {
            font-size: 14px;
            line-height: 1.7;
            margin: 8px 0;
        }

        ul {
            padding-left: 20px;
        }

        li {
            padding: 5px 0;
            font-size: 14px;
        }

        pre {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            font-size: 13px;
            line-height: 1.6;
            overflow-x: auto;
            color: #374151;
        }

        .first-subject {
            padding: 12px;
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
            font-size: 14px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }

        th, td {
            border: 1px solid #e5e7eb;
            padding: 12px;
            text-align: left;
        }

        th {
            background: #f3f4f6;
            font-weight: 600;
        }

        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>

<body>

<div class="container">

    <h2>Student Profile</h2>

    <p><b>Student Number:</b>
        <?php echo htmlspecialchars($data["student_number"]); ?>
    </p>

    <p><b>Name:</b>
        <?php echo htmlspecialchars($data["name"]); ?>
    </p>

    <p><b>Course:</b>
        <?php echo htmlspecialchars($data["course"]); ?>
    </p>

    <h3>Enrolled Subjects</h3>

    <ul>
        <?php
        foreach($data["subjects"] as $subject) {
            echo "<li>" . htmlspecialchars($subject) . "</li>";
        }
        ?>
    </ul>

    <h3>JSON String</h3>

    <pre><?php echo htmlspecialchars($json); ?></pre>

    <h3>First Subject</h3>

    <div class="first-subject">
        <?php echo htmlspecialchars($data["subjects"][0]); ?>
    </div>

    <h3>Difference Between Array and JSON String</h3>

    <table>
        <tr>
            <th>Array</th>
            <th>JSON String</th>
        </tr>
        <tr>
            <td>Stores data in PHP.</td>
            <td>Stores data as text.</td>
        </tr>
        <tr>
            <td>Can be accessed directly.</td>
            <td>Needs decoding before use.</td>
        </tr>
    </table>

    <div class="footer">
        Student Profile System &copy; 2026
    </div>

</div>

</body>
</html>

