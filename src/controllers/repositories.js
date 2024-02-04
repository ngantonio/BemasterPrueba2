import axios from "axios";

export const getTopGoogleRepos = async (req, res) => {
  try {
    // users/google/repos
    // orgs/google/repos
    let response = await axios.get(
      "https://api.github.com/users/google/repos",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // Sort function
    let newData = response.data
      .sort((a, b) => {
        if (a.stargazers_count < b.stargazers_count) return 1;
        else if (a.stargazers_count > b.stargazers_count) return -1;
        return 0;
      })
      .slice(0, 10);

    let responseData = [];

    // Select relevant data
    newData.forEach((element) => {
      const repo = {
        id: element.id,
        repo_name: element.name,
        stars: element.stargazers_count,
        html_url: element.html_url,
        language: element.language,
      };

      responseData.push(repo);
    });

    return res
      .status(200)
      .json({ status: 200, message: "OK", data: responseData });
  } catch (error) {
    return res.status(404).json({
      status: 400,
      message:
        "We couldn't find the repositories, maybe a Github connection trouble",
    });
  }
};

export const oddNumbers = async (req, res) => {
  let n = 0;
  let oddArr = [];

  req.query?.number ? (n = req.query?.number) : (n = 10);

  for (let index = 1; index <= n; index++) {
    index % 2 !== 0 ? oddArr.push(index) : null;
  }

  return res.status(200).json({ status: 200, message: "OK", odds: oddArr });
};
