import * as authService from "../services/authService.js";

const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! cek email kamu.",
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { register, login };
